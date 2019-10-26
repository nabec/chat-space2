FactoryBot.define do

  factory :user do
    name {Faker::Name.last_name}
    email {Faker::Internet.free_email}
    password {Faker::Internet.password}
    password_confirmation {Faker::Internet.password}
  end

end