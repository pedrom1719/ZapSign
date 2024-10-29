""" Criando tabelas """
from django.db import models

# Create your models here.
class Company(models.Model):
    """ Criando tabela Company """
    company_name = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update_at = models.DateTimeField(auto_now=True)
    api_token = models.CharField(max_length=255, null=False)
    def __str__(self):
        return self.company_name

class Document(models.Model):
    """ Criando tabela Document """
    openID = models.IntegerField(null=False)
    token = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=50, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    last_update_at = models.DateTimeField(auto_now=True)
    companyID = models.ForeignKey(Company, on_delete=models.CASCADE)
    original_file = models.CharField(max_length=500, default='https://ebac-homepage.vercel.app/image-host/ZAP-Document.pdf')
    externalID = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Signers(models.Model):
    """ Criando tabela Signers """
    token = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=255, null=False)
    email = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=50, null=False)
    externalID = models.CharField(max_length=255)
    documentID = models.ForeignKey(Document, on_delete=models.CASCADE)
    def __str__(self):
        return self.name
