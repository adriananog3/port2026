#!/usr/bin/env bash
# Publica o site no Cloud Run. Uso: ./deploy.sh SEU_PROJECT_ID [regiao]
set -euo pipefail
PROJECT="${1:?Informe o PROJECT_ID do Google Cloud}"
REGION="${2:-us-east1}"
gcloud config set project "$PROJECT" >/dev/null
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com --quiet
EXTRA=(--set-env-vars CONTACT_TO=contato-assessoria@adriana-nogueira.com)
if gcloud secrets describe resend-api-key >/dev/null 2>&1; then
  NUM=$(gcloud projects describe "$PROJECT" --format='value(projectNumber)')
  gcloud secrets add-iam-policy-binding resend-api-key --member="serviceAccount:${NUM}-compute@developer.gserviceaccount.com" --role=roles/secretmanager.secretAccessor --quiet >/dev/null
  EXTRA+=(--set-secrets RESEND_API_KEY=resend-api-key:latest)
else
  echo "Aviso: segredo resend-api-key não existe ainda; o formulário vai pedir para escrever por e-mail até ele ser criado."
fi
gcloud run deploy adriana-site --source . --region "$REGION" --project "$PROJECT" \
  --allow-unauthenticated --min-instances 0 --max-instances 3 \
  --cpu 1 --memory 256Mi --concurrency 80 --quiet "${EXTRA[@]}"
echo "Revise a URL *.run.app acima antes de apontar o DNS."
