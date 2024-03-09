class Review < ApplicationRecord
  validates :rating, presence: true, inclusion: { in: 1..5, message: "must be between 1 and 5" }
  validates :body, presence: true
  validate :not_a_duplicate, on: :create

  belongs_to :user
  belongs_to :bench

  private

  def not_a_duplicate
    if Review.exists?(bench_id: bench_id, user_id: user_id)
      errors.add(:base, message: 'You have already reviewed this bench.')
    end
  end
end