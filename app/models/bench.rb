class Bench < ApplicationRecord
  validates :title, :description, :price, :seating, :lat, :lng, presence: true
  validates :price, inclusion: { in: 10..1000, message: "must be between $10 and $1000" }

  has_many :reviews, dependent: :destroy
end
