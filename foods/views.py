from rest_framework import generics

from .models import Food
from .serializers import FoodSerializer

# Create your views here.


class FoodListAPIView(generics.ListAPIView):
    queryset = Food.objects.filter(active=True)
    serializer_class = FoodSerializer  # in serializer, we determine what fields are returned and are edited. Serializes information as JSON.


class AdminFoodListAPIView(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    

class FoodDetailAPIView(generics.RetrieveUpdateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer