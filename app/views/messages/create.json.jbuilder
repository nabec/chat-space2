json.text @message.text
json.image @message.image
json.image_url @message.image.url
json.image_filename @message.image.filename
json.user_name @message.user.name
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")