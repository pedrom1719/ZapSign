from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import DocumentViewSet, SignersViewSet, DocumentDetailView, create_document, create_signer, update_document

# Definindo rotas do ViewSet
router = DefaultRouter()
router.register(r'documents', DocumentViewSet)
router.register(r'signers', SignersViewSet)

# Definindo os caminhos das rotas e as views atribuidas a cada caminho
urlpatterns = [
    path("", include(router.urls)),
    path('create-doc/', create_document, name='createDoc'),
    path('update-doc/<int:id>/', update_document, name='updateDoc'),
    path('create-signer/', create_signer, name='createSigner'),
    path('documents/openid/<int:open_id>/', DocumentDetailView.as_view(), name='document_by_openid'),
]