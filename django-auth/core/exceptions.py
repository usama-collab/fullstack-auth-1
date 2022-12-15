from urllib import response
# its an optional exceptional handler for some cases not necessarily needed at all,set in settings.py
from rest_framework.views import exception_handler


def status_code_handler(exc, content):
    response = exception_handler(exc, content)

    if response is not None and response.status_code == 403:
        response.status_code = 401

    return response
