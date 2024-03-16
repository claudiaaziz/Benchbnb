ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Bench.destroy_all
  Review.destroy_all 

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('benches')
  ApplicationRecord.connection.reset_pk_sequence!('reviews')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'Demo-lition', 
    email: 'demo@user.io', 
    password: 'password'
  )

  # More users
  User.create!(
    username: 'claudia', 
    email: 'claudiahannahh@gmail.com', 
    password: 'asdfghjkl'
  )

  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end


  puts "Creating benches..."
  # Bench 1
  mermaid_bench = Bench.create(
    title: "Mermaid Bench",
    description: "A mystical spot where mermaids gather to rest and enjoy the ocean breeze.",
    price: 1000,
    seating: 3,
    lat: 37.69056805123149,
    lng: -122.31071323156357,
  )

  mermaid_bench.photo.attach(io: URI.open('https://static.wikia.nocookie.net/h2o/images/6/66/Emma_Found_The_Locket.jpg/revision/latest/scale-to-width-down/250?cb=20200905151552'), filename: 'emma.png')
    
  # Bench 2
  lakeside_retreat_bench = Bench.create(
    title: "Lakeside Retreat Bench",
    description: "A tranquil spot offering a retreat from the bustling world, right by the serene lakeshore.",
    price: 75,
    seating: 2,
    lat: 37.78008987155716,
    lng: -122.28001485352814
  )

  lakeside_retreat_bench.photo.attach(io: URI.open('https://images.pexels.com/photos/5727263/pexels-photo-5727263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'), filename: 'lakeside_retreat_bench.png')

  # Bench 3
  cozy_garden_bench = Bench.create(
    title: "Cozy Garden Bench",
    description: "A charming bench tucked away in a delightful garden, perfect for quiet contemplation and relaxation.",
    price: 30,
    seating: 2,
    lat: 37.6845125216827,
    lng: -122.4036110468394
  )

  cozy_garden_bench.photo.attach(io: URI.open('https://images.pexels.com/photos/227391/pexels-photo-227391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'), filename: 'cozy_garden_bench.png')

  # Bench 4
  cloud_bench = Bench.create(
    title: "Cloud Bench",
    description: "Elevated high above, this bench offers panoramic views of majestic clouds dancing in the sky.",
    price: 90,
    seating: 4,
    lat: 37.74860642003675,
    lng: -122.48188863593654
  )

  cloud_bench.photo.attach(io: URI.open('https://images.pexels.com/photos/1446548/pexels-photo-1446548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'), filename: 'cloud_bench.png')

  # Bench 5
  uae_bench = Bench.create(
    title: "Beachfront Relaxation Bench",
    description: "Unwind by the tranquil beach, letting the gentle waves and soft sands soothe your soul on this relaxation bench.",
    price: 60,
    seating: 3,
    lat: 37.6769044817534,
    lng: -122.45579610623749
  )

  uae_bench.photo.attach(io: URI.open('https://images.pexels.com/photos/8319454/pexels-photo-8319454.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'), filename: 'uae_bench.png')

  puts "Done!"
end
