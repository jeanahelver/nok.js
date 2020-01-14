# nok.js
graphics engine for nokia 3310 jam 2

## documentation:
running at aproximatly 15 fps at 84x48 pixels.

`function init()` will run once and `function draw(delta)` will run every frame.

##### there are 7 "fill" pattern to select from:
|index| pattern|
|--|--|
|0|white|
|1|black|
|2|checker|
|3|dots|
|4|inverted dots|
|5|doted lines|
|6|mosaic|

## nok functions:
  * `nok.clear(pattern)`
  * `nok.pixel(x, y)`
  * `nok.line(start x, start y, end x, end y)`
  * `nok.sprite(sprite, x, y)`
  * `nok.rect(pattern, x, y, width, height)`
  * `nok.circle(radius, x, y)`
  * `nok.number(value, x, y)` drawing number values in the snake score font
  
 
 ### nok.key
  * `nok.key.one` 1
  * `nok.key.two` 2 
  * `nok.key.three` 3 
  * `nok.key.four` 4 
  * `nok.key.five` 5
  * `nok.key.six` 6 
  * `nok.key.seven` 7 
  * `nok.key.eight` 8 
  * `nok.key.nine` 9 
  * `nok.key.star` * 
  * `nok.key.zero` 0 
  * `nok.key.octothorpe`\#
  
 ![button map](/buttons.png)
