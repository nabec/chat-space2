$(document).on('turbolinks:load', function() {
  $(function() {
    function buildHTML(message) {
      var image = message.image_url ? `<img class="chat-main__messages__message__text__image" src="${message.image_url}" alt="${message.image_filename}">`
                                        : "" 
      var html = `<div class="chat-main__messages__message" data-group-id="${message.group_id}" data-message-id="${message.id}">
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
        $('#new_message')[0].reset();
        $('.chat-main__form__new-message__submit-btn').prop('disabled', false);
        $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
      })
      .fail(function() {
        alert('メッセージを入力してください');
        $('.chat-main__form__new-message__submit-btn').prop('disabled', false);
      })
    });

    var reloadMessages = function() {
      if (location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.chat-main__messages__message:last').data('message-id');
        $.ajax({
          url: "api/messages",
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          messages.forEach(function(message) {
            var insertHTML = buildHTML(message);
            $('.chat-main__messages').append(insertHTML);
            $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight});
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    };
    setInterval(reloadMessages, 5000);
  });
});