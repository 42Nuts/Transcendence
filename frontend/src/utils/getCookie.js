export default getCookie;

function getCookie(name) {
    var cookieValue;
    const cookies = document.cookie.split(`; `).map((el) => el.split('='));

    for (var i = 0; i < cookies.length; ++i)
    {
        if (cookies[i][0] == name)
        {
            cookieValue = cookies[i][1];
            break ;
        }
    }
    return cookieValue;
}
