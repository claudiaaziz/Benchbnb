class Review < ApplicationRecord
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :body, presence: true, length: { minimum: 3 }
  validate :not_a_duplicate, on: :create

  belongs_to :user
  belongs_to :bench

  private

  def not_a_duplicate
    existing_review = Review.find_by(bench_id: bench_id, user_id: user_id)
    if existing_review && existing_review.persisted?
      errors.add(:base, 'You have already reviewed this bench.')
    end
  end
end