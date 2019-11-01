$(document).on('turbolinks:load', function() {
  $(function() {
    function buildHTML(message) {
      var image = message.image_url ? `<img class="chat-main__messages__message__text__image" src="${message.image_url}" alt="${message.image_filename}">`
                                        : "" 
      var html = `<div class="chat-main__messages__message">
                    <div class="chat-main__messages__message__upper-info">
                      <p class="chat-main__messages__message__upper-info__talker">
                        ${message.user_name}
                      </p>
                      <p class="chat-main__messages__message__upper-info__date">
                        ${message.date}
                      </p>
                    </div>
                    <div class="chat-main__messages__message__text">
                      <p class="chat-main__messages__message__text">
                        ${message.text}
                      </p>
                      ${image}
                    </div>`
      return html;
    }

    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message) {
        var html = buildHTML(message);
        $('.chat-main__messages').append(html);
        $('#message_text').val('');
        $('.chat-main__form__new-message__submit-btn').prop('disabled', false);
        $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('メッセージを入力してください');
        $('.chat-main__form__new-message__submit-btn').prop('disabled', false);
      })
    });
  });
});