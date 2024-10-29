from django.test import TestCase
from django.urls import reverse
import json
from .models import Document, Signers, Company

class DocumentTests(TestCase):

    # Setando ambiente com valores ficticios para teste
    def setUp(self):
        self.company = Company.objects.create(company_name='Test Company', api_token='test_token')

        self.document_data = {
            'openID': 123456, 
            'token': '1234',
            'name': 'Test Document',
            'status': 'pending',
            'created_at': '2023-01-01T00:00:00Z',
            'last_update_at': '2023-01-01T00:00:00Z',
            'externalID': 'None',
            'companyID': self.company.id,
            'original_file': 'path/to/file.pdf',
        }

        self.signer_data = {
            'signer_token': '1234',
            'signer_name': 'Test Signer',
            'signer_email': 'signer@example.com',
            'signer_status': 'new',
            'signer_id': 'None',
            'document_id': None,
        }

    # Testando criacao do documento 
    def test_create_document(self):
        response = self.client.post(reverse('createDoc'), data=json.dumps(self.document_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.json())
        self.assertEqual(response.json()['status'], 'success')

    # Testando a busca pelo ID do documento antes de alterar
    def test_update_document_not_found(self):
        response = self.client.put(reverse('updateDoc', args=[999]), data=json.dumps(self.document_data), content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {'error': 'Document not found.'})

    # Testando criacao de signatario 
    def test_create_signer(self):
        document = Document.objects.create(
            openID=self.document_data['openID'],
            token=self.document_data['token'],
            name=self.document_data['name'],
            status=self.document_data['status'],
            created_at=self.document_data['created_at'],
            last_update_at=self.document_data['last_update_at'],
            externalID=self.document_data['externalID'],
            companyID=self.company,
            original_file=self.document_data['original_file'],
        )
        self.signer_data['document_id'] = document.id
        response = self.client.post(reverse('createSigner'), data=json.dumps(self.signer_data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.json())
        self.assertEqual(response.json()['status'], 'success')

    # Testando busca de dados de documento para detalhes
    def test_document_detail_view(self):
        document = Document.objects.create(
            openID=self.document_data['openID'],
            token=self.document_data['token'],
            name=self.document_data['name'],
            status=self.document_data['status'],
            created_at=self.document_data['created_at'],
            last_update_at=self.document_data['last_update_at'],
            externalID=self.document_data['externalID'],
            companyID=self.company,
            original_file=self.document_data['original_file'],
        )
        response = self.client.get(reverse('document_by_openid', args=[document.openID]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['openID'], document.openID)