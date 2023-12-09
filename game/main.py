import pygame
import random
from constants import *
from obstacles import *
from timing import *
from player import *

pygame.init()
#Essential variables
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption('box dash')
#Timers and runtime control
set_timers()
elapsed = 0
run = True

'''
Moves the player and ends the game if you lose
@param game_over: Loss condition (if you get hit by a block)
'''
def play(game_over):
    key = pygame.key.get_pressed()
    if not game_over:
        move_player(key)
    else:
        #game over
        text_surface = my_font.render('Game Over', True, (0, 0, 0))
        screen.blit(text_surface, (300, 550))

#Game loop
while run: 
    pygame.font.init() # you have to call this at the start if you want to use this module.               
    my_font = pygame.font.SysFont('Comic Sans MS', 30)
    #refill screen background
    screen.fill((255,255,255))

    #draw player
    pygame.draw.rect(screen, (255,0,0), player)
    game_over = move_obstacles(player, screen)
    
    play(game_over)

    #display time
    show_time(my_font, screen, elapsed)
    
    #event handler
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = False
        if event.type == TIMER_TICK and not game_over:
            elapsed += 1
        if event.type == NEW_OBSTACLE and not game_over:
            spawn_obstacles()
            
    #update display (keeps game stuff shown on screen)
    pygame.display.update()

pygame.quit()