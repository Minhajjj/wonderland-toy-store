import React from "react";

const FeaturedCards = () => {
  const featuredCardsData = [
    {
      title: "New Arrivals",
      description: "Explore the latest toys",
      imageUrl:
        "https://via.placeholder.com/240x200/FF6B9D/FFFFFF?text=New+Toys",
    },
    {
      title: "Best Sellers",
      description: "Most loved by kids",
      imageUrl:
        "https://via.placeholder.com/240x200/FFC93C/FFFFFF?text=Popular",
    },
    {
      title: "On Sale",
      description: "Save on favorites",
      imageUrl: "https://via.placeholder.com/240x200/5DADE2/FFFFFF?text=Sale",
    },
    {
      title: "Sets for kids",
      description: "Complete playsets",
      imageUrl:
        "https://via.placeholder.com/240x200/58D68D/FFFFFF?text=Playsets",
    },
    {
      title: "Shop by Age",
      description: "Toys for every age group",
      imageUrl:
        "https://via.placeholder.com/240x200/F4D03F/FFFFFF?text=By+Age",
    },
    {
      title: "Educational Toys",
      description: "Learn through play",
      imageUrl:
        "https://via.placeholder.com/240x200/AF7AC5/FFFFFF?text=Educational",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 bg-[#FFF8F0]">
      {featuredCardsData.map((card, index) => (
        <div
          key={index}
          className="w-55 bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#FF6B9D]/30"
        >
          {/* Card Header with Option B Gradient */}
          <div className="bg-linear-to-r from-[#FF6B9D] via-[#9B59B6] to-[#4FA8D5] text-white text-center py-3 text-lg font-bold tracking-wide">
            {card.title}
          </div>

          <div
            className="w-full h-40 bg-cover bg-center"
            style={{ backgroundImage: `url(${card.imageUrl})` }}
          ></div>

          <div className="p-4 text-center">
            <p className="text-[#2C3E50] font-semibold mb-3">
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedCards;
