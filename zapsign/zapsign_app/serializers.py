from rest_framework import serializers
from .models import Document, Signers

# Serializer de Documento
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'

# Serializer de Signatario
class SignersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signers
        fields = '__all__'