;(function($) {
    var option = {
        size: 3,
        list: [],
        id: 'bingo'
    }
    var bingox = {}
    var bingoy = {}
    var bingoz = [0,0]
    var bingcnt = 0
    $.bingoJs = {
        reset:function(){
            bingox = {}
            bingoy = {}
            bingoz = [0,0]
            bingcnt = 0
            option = {
                size: 3,
                list: [],
                id: 'bingo'
            }
        },
        ready: function(s, id) {
            this.reset()
            if (s) option.size = parseInt(s)
            if (id) option.id = id
            for (var i = 1; i <= (option.size * option.size); i++) option.list.push(i)
            this.shuffle()
            //초기화
            $("#" + option.id).html("")
            //틀추가
            $("#" + option.id).append("<div class='b_table'></div>")
            var _row = ""
            for (var i = 0; i < (option.size * option.size); i++) {
                if (i % option.size === 0) {
                    _row += "<div class='b_table_row'>"
                }
                _row += "<div class='b_table_cell cell_" + i + "' onclick='$.bingoJs.clickcell(" + i + ")' >" + option.list[i] + "</div>";
                if (i % option.size === (option.size - 1)) {
                    _row += "</div>"
                    $(".b_table").append(_row)
                    _row = ""
                }
            }
        },
        shuffle: function() {
            for (var j, x, i = option.list.length; i; j = parseInt(Math.random() * i), x = option.list[--i], option.list[i] = option.list[j], option.list[j] = x);
        },
        clickcell: function(s) {
            var c = s + 1
            var x = (c % option.size === 0) ? option.size : c % option.size
            var y = Math.floor(((c + option.size) - 1) / option.size)

            if (!bingox[x]) bingox[x] = 0
            if (!bingoy[y]) bingoy[y] = 0
            bingox[x]++
            bingoy[y]++
            if (bingox[x] == option.size) bingcnt++
            if (bingoy[y] == option.size) bingcnt++

            if(x === y){
                bingoz[0]++
                if (bingoz[0] == option.size) bingcnt++
            }

            if(option.size % 2 === 0 && (x+y) === (option.size+1)){
                bingoz[1]++
                if (bingoz[1] == option.size) bingcnt++
            }
            $('.cell_' + s).css("background-color", "red")
        },
        chkbingocnt: function() {
            $(".cnt").html(bingcnt)
        }
    }
})(jQuery);
