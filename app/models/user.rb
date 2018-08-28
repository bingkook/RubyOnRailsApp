class User < ApplicationRecord
    validates :name, length: { maximum: 20 }
end
