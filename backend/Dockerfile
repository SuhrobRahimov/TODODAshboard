FROM python:3.7-slim

ENV PYTHONUNBUFFERED 1

RUN mkdir /backend
COPY ./ /backend/

RUN pip install --upgrade pip && pip install -r /backend/requirements.txt
RUN chown -R root:root /backend
RUN chmod +x /backend/manage.py

WORKDIR /backend

USER root
