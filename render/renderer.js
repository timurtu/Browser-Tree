/**
 * Created by timur on 4/17/16.
 */
import $ from 'jquery'

$(() => {
  $('#go').click(() => {
    $('.webview').attr('src', `http://${$('#urlbar').val()}`)
  })
})

