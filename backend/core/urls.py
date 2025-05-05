from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, FollowViewSet, RegisterView, CustomTokenObtainPairView, UserDetailView

router = DefaultRouter()
router.register(r'posts', PostViewSet)
router.register(r'follow', FollowViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('user/<int:user_id>/', UserDetailView.as_view(), name='user_detail'),  # Nova rota
    path('', include(router.urls)),
]
