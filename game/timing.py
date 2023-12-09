import pygame
from constants import *

'''
calculates and shows the time
'''
def show_time(font, screen, time):
    #time display
    time_minutes = time // 60
    time_secs = time % 60
    time = f'{time_minutes} : {time_secs:02}'
    time_text = font.render(time, True, (0,0,0))
    screen.blit(time_text, (700, 0))


def set_timers():
    pygame.time.set_timer(NEW_OBSTACLE, 200)
    pygame.time.set_timer(TIMER_TICK, 1000)

