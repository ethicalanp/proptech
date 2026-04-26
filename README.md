<div align="center">

# 🏠 Proptech

**A trust-based Property Sale and rental  ecosystem **

Match · Verify · Manage — end to end.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Django](https://img.shields.io/badge/Django-DRF-092E20?style=flat-square&logo=django)](https://www.django-rest-framework.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-336791?style=flat-square&logo=postgresql)](https://postgis.net)
[![React Native](https://img.shields.io/badge/React_Native-Mobile-61DAFB?style=flat-square&logo=react)](https://reactnative.dev)

</div>

---

## The Problem

The rental market is broken in ways most platforms ignore:

- **No trust layer** — landlords fear bad tenants; tenants fear fraudulent listings, with no accountability on either side
- **Poor matching** — existing platforms filter only by price and location, ignoring lifestyle compatibility — the real source of rental conflicts
- **No post-rental support** — once a lease is signed, there's no system for rent tracking, dispute handling, or digital records
- **Fragmented experience** — users bounce between listing sites, WhatsApp, brokers, and physical paperwork just to complete one rental

---

## The Solution

RentOS brings the entire rental lifecycle onto a single platform:

| Feature | What it does |
|---|---|
| **Compatibility Matching** | Matches tenants with properties and roommates based on lifestyle, habits, and preferences — not just budget |
| **Trust & Verification** | Identity verification and behavioral trust scores for both tenants and landlords |
| **Tenancy Management** | Digital agreements, rent tracking, automated invoices, and online payments — all in one place |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, Tailwind CSS |
| Mobile | React Native |
| Backend | Django, Django REST Framework |
| Database | PostgreSQL, PostGIS |
| Cache / Tasks | Redis, Celery |
| Storage | AWS S3 |
| Payments | Razorpay |
| Infrastructure | Docker, Nginx, Gunicorn |
| Cloud | AWS / DigitalOcean |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL with PostGIS
- Docker (recommended)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend

```bash
cd backend
python -m venv env
source env/bin/activate      # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### With Docker

```bash
docker compose up --build
```

---

## Project Structure

```
rentos/
├── frontend/        # Next.js web app
├── mobile/          # React Native app
├── backend/         # Django + DRF API
└── docker-compose.yml
```

---

## Status

> 🚧 **MVP in active development**

---

## License

Proprietary — All rights reserved.