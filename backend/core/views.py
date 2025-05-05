from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from .models import Post, Follow
from .serializers import (
    PostSerializer,
    FollowSerializer,
    UserSerializer,
    CustomTokenObtainPairSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

# Paginação para os posts
class PostPagination(PageNumberPagination):
    page_size = 10

# View para exibir os posts
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PostPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        following_users = Follow.objects.filter(follower=user).values_list('user', flat=True)
        return Post.objects.filter(user__in=following_users).order_by('-created_at')

# View para seguir usuários
class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(follower=self.request.user)

# View para registrar novos usuários
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# View para login com JWT
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Nova view para obter os detalhes de um usuário com base no user_id
class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        return Response({
            'username': user.username,
            'email': user.email
        }, status=status.HTTP_200_OK)
