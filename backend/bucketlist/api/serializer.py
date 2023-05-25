from rest_framework import serializers
from rest_framework_simplejwt.serializers import RefreshToken, TokenObtainPairSerializer
from collections import OrderedDict
from typing import Any
from django.contrib.auth.models import User

from .models import UserProfile, PublicVacationDestination, PrivateVacationDestination


class DynamicSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        kwargs.pop('fields', None)
        depth = kwargs.pop('depth', None)
        super().__init__(*args, **kwargs)
        self.Meta.depth = 1 if depth is None else depth


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    token_class = RefreshToken

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        user = UserProfile.objects.get(user_id=self.user.username)

        refresh["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "email": self.user.email,
            "role": user.role,
        }

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data


class PrivateVacationDestinationSerializer(DynamicSerializer):
    class Meta:
        model = PrivateVacationDestination
        fields = "__all__"
        depth = 1

    def validate(self, attrs):
        title = attrs.get('title')
        geolocation = attrs.get('geolocation')
        imageURL = attrs.get('imageURL')
        description = attrs.get('description')
        arrival_date = attrs.get('arrival_date')
        departure_date = attrs.get('departure_date')
        # Perform the uniqueness check
        if title and geolocation and imageURL and description and arrival_date and departure_date:
            queryset = PrivateVacationDestination.objects.filter(title=title, geolocation=geolocation,
                                                                 imageURL=imageURL, description=description,
                                                                 arrival_date=arrival_date,
                                                                 departure_date=departure_date)
            if queryset.exists():
                raise serializers.ValidationError("Object with these attributes already exists.")

        return attrs


class PublicVacationDestinationSerializer(DynamicSerializer):
    class Meta:
        model = PublicVacationDestination
        fields = "__all__"
        depth = 1

    def validate(self, attrs):
        title = attrs.get('title')
        geolocation = attrs.get('geolocation')
        imageURL = attrs.get('imageURL')
        description = attrs.get('description')
        arrival_date = attrs.get('arrival_date')
        departure_date = attrs.get('departure_date')
        # Perform the uniqueness check
        if title and geolocation and imageURL and description and arrival_date and departure_date:
            queryset = PrivateVacationDestination.objects.filter(title=title, geolocation=geolocation,
                                                                 imageURL=imageURL, description=description,
                                                                 arrival_date=arrival_date,
                                                                 departure_date=departure_date)
            if queryset.exists():
                raise serializers.ValidationError("Object with these attributes already exists.")

        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username",
            "password",
        )

    def validate_password(self, value):
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError('Password must contain at least one digit.')

        if not any(char.isupper() for char in value):
            raise serializers.ValidationError('Password must contain at least one uppercase letter.')

        return value


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = (
            "user",
            "email",
            "role",
            "activation_code",
            "activation_expiry_date",
            "active",
        )

    def create(self, validated_data: OrderedDict[str, Any]) -> UserProfile:
        user_data = validated_data.pop("user")
        user_data['is_active'] = False
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile


class UserProfileDetailSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, user_profile: UserProfile) -> str:
        return user_profile.user_id  # type: ignore

    class Meta:
        model = UserProfile
        fields = (
            "username",
            "email",
            "role",
        )
