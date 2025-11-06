from django.db.models import Q

from accounts.models import Caretaker
from .serializers import CaretakerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.


@api_view(["GET"])
def search_caretakers(request):
    query = request.GET.get("q", "").strip()

    print(query)

    if not query:
        return Response([])

    caretakers = Caretaker.objects.filter(
        Q(first_name__icontains=query) |
        Q(last_name__icontains=query)
    )

    print(caretakers)

    serialized = CaretakerSerializer(caretakers, many=True)
    return Response(serialized.data)