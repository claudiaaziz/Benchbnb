json.bench do 
  json.extract! @bench, :id, :title, :description, :price, :seating, :lat, :lng

  json.reviews @bench.reviews do |review|
    json.extract! review, :id, :rating, :body
    json.username review.user.username
  end
end
