json.bench do 
  json.extract! @bench, :id, :title, :description, :price, :seating, :lat, :lng

  json.reviews @bench.reviews do |review|
    json.extract! review, :id, :rating, :body, :user_id
  end
end
