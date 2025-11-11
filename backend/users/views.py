from django.db.models import Q

from accounts.models import Caretaker
from .serializers import CaretakerLongSerializer, CaretakerShortSerializer
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
        Q(user__first_name__icontains=query) |
        Q(user__last_name__icontains=query)
    )

    serialized = CaretakerShortSerializer(caretakers, many=True)
    return Response(serialized.data)


@api_view(["GET"])
def caretakerById(request, id):
    try:
        caretaker = Caretaker.objects.get(user_id=id)
    except:
        return Response({"error":f"No caretaker was found matching the specified ID ({id})."}, status=404)

    serialized = CaretakerLongSerializer(caretaker)
    return Response(serialized.data)


#jos se ne koristi
@api_view(["GET"])
def caretakerBySlug(request, slug):
    return Response(f"slug: {id}")