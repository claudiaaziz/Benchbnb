json.bench do 
  json.extract! @bench, :id, :title, :description, :price, :seating, :lat, :lng

  json.photo_url url_for(@bench.photo) if @bench.photo.attached?

  json.reviews @bench.reviews do |review|
    json.extract! review, :id, :rating, :body, :user_id
    json.username review.user.username
  end
end