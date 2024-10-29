from django.contrib import admin
from .models import Company, Document, Signers

# Adicionando modelos ao banco de dados:
admin.site.register(Company)
admin.site.register(Document)
admin.site.register(Signers)
