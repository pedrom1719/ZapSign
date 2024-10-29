from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.views import View

import json

from .models import Document, Signers
from .serializers import DocumentSerializer
from .serializers import SignersSerializer

# ViewSet de Documento
class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

# ViewSet de Signatarios
class SignersViewSet(viewsets.ModelViewSet):
    queryset = Signers.objects.all()
    serializer_class = SignersSerializer

# Metodo POST com requisicao para inserir documento no banco de dados
@csrf_exempt
def create_document(request):
    # Verificando metodo
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        # Atribuindo valores passados pelo body da requisicao HTTP do Angular
        doc = Document.objects.create(
            openID=data['openID'],
            token=data['token'],
            name=data['name'],
            status=data['status'],
            created_at=data['created_at'],
            last_update_at=data['last_update_at'],
            externalID=data['externalID'],
            companyID_id=data['companyID'],
            original_file=data['original_file'],
        )
        return JsonResponse({'id': doc.id, 'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

# Metodo PUT com requisicao para atualizar campos do documento no banco de dados
@csrf_exempt
def update_document(request, id):
    # Verificando metodo
    if request.method == 'PUT':
        try:
            # Verificando se o ID do documento a ser alterado existe
            document = Document.objects.get(id=id)
        except Document.DoesNotExist:
            return JsonResponse({'error': 'Document not found.'}, status=404)
        
        data = JSONParser().parse(request)
        serializer = DocumentSerializer(document, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

# Metodo POST com requisicao para inserir signatario no banco de dados
@csrf_exempt
def create_signer(request):
    # Verificando metodo
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        # Atribuindo valores passados pelo body da requisicao HTTP do Angular
        doc = Signers.objects.create(
            token=data['signer_token'],
            name=data['signer_name'],
            email=data['signer_email'],
            status=data['signer_status'],
            externalID=data['signer_id'],
            documentID_id=data['document_id']
        )
        return JsonResponse({'id': doc.id, 'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)

class DocumentDetailView(View):
    def get(self, request, open_id):
        try:
            document = Document.objects.get(openID=open_id)
            data = {
                'id': document.id,
                'openID': document.openID,
                'token': document.token,
                'name': document.name,
                'status': document.status,
                'created_at': document.created_at.isoformat(),
                'companyID_id': document.companyID.id,
                'original_file': document.original_file,
            }
            return JsonResponse(data)
        except Document.DoesNotExist:
            return JsonResponse({'error': 'Document not found'}, status=404)
