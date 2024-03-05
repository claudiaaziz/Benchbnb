class Review < ApplicationRecord
  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :body, presence: true, length: { minimum: 3 }
  validate :not_a_duplicate, on: :create

  belongs_to :user
  belongs_to :bench

  private

  def not_a_duplicate
    if Review.where(user_id: user_id, bench_id: bench_id).exists?
      errors.add(:base, 'You have already reviewed this bench.')
    end
  end
end