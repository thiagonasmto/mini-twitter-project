# core/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Post, Follow

class PostSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # Mostrar o nome de usuário

    class Meta:
        model = Post
        fields = ['id', 'user', 'content', 'created_at']

class FollowSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    follower = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Follow
        fields = ['user', 'follower']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Serializer para autenticação JWT com informações extras
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Adiciona informações extras no payload do token JWT
        token['username'] = user.username
        token['email'] = user.email
        return token
