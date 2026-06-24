from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

GNEWS_API_KEY = "83ba54c017c658563051ff34eb51e19f"



@api_view(['GET'])
def get_news(request):

    try:
        # Fetch more articles so duplicates can be removed
        url = (
            f"https://gnews.io/api/v4/search?"
            f"q=Artificial Intelligence OR LLM OR OpenAI"
            f"&lang=en"
            f"&max=20"
            f"&apikey={GNEWS_API_KEY}"
        )

        response = requests.get(url)
        data = response.json()

        # Check if articles exist
        if "articles" not in data:
            return Response({
                "status": "error",
                "message": "No articles found",
                "response": data
            })

        # Remove duplicate articles based on title
        seen_titles = set()
        unique_articles = []

        for article in data["articles"]:

            title = article.get("title", "").strip().lower()

            if title and title not in seen_titles:

                seen_titles.add(title)

                unique_articles.append({
                    "title": article.get("title"),
                    "description": article.get("description"),
                    "image": article.get("image"),
                    "url": article.get("url"),
                    "source": article.get("source", {}).get("name"),
                    "publishedAt": article.get("publishedAt")
                })

        # Keep only top 5 unique articles
        top_five_articles = unique_articles[:5]

        return Response({
            "status": "success",
            "totalArticles": len(top_five_articles),
            "articles": top_five_articles
        })

    except Exception as e:

        return Response({
            "status": "error",
            "message": str(e)
        }, status=500)