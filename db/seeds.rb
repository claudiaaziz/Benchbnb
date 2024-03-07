# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

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
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end


  puts "Creating benches..."
  # Bench 1
  Bench.create(
    title: "City Park Bench",
    description: "A comfortable bench in the heart of the city park.",
    price: 50,
    seating: 3,
    lat: 37.75403555744388,
    lng: -122.44549642346153
  )

  # Bench 2
  Bench.create(
    title: "Lakeside Retreat Bench",
    description: "Enjoy the serene view by sitting on this lakeside bench.",
    price: 75,
    seating: 2,
    lat: 37.78008987155716,
    lng: -122.28001485352814
  )

  # Bench 3
  Bench.create(
    title: "Cozy Garden Bench",
    description: "A small and cozy bench nestled in a beautiful garden.",
    price: 30,
    seating: 2,
    lat: 37.6845125216827,
    lng: -122.4036110468394
  )

  # Bench 4
  Bench.create(
    title: "Mountain View Bench",
    description: "Take in the breathtaking mountain views from this sturdy bench.",
    price: 90,
    seating: 4,
    lat: 37.74860642003675,
    lng: -122.48188863593654
  )

  # Bench 5
  Bench.create(
    title: "Beachfront Relaxation Bench",
    description: "Unwind by the beach on this comfortable beachfront bench.",
    price: 60,
    seating: 3,
    lat: 37.6769044817534,
    lng: -122.45579610623749
  )

  puts "Done!"
end
