import pygame
import random
from constants import *

#obstacle variables
obstacles_size = (18, 50)
obstacle_no = 0
obstacle_queue = [] #array containing a group of obstacles
new_obstacle = False

"""
move the obstacles in the obstacle queue
"""
def move_obstacles(player, screen):
     #If you hit an obstacle, game over
    game_over = True if True in [player.colliderect(obstacle_) for obstacle_ in obstacle_queue] else False
    #draw and move obstacles
    for obstacle_ in obstacle_queue:
        if obstacle_.y < OBSTACLE_UNSPAWN_Y:
            pygame.draw.rect(screen, (0,0,0), obstacle_)               
    #move obstacles
    if not game_over:
        for obstacle_ in obstacle_queue:
            obstacle_.move_ip(0, 3)
    
    return game_over

"""
spawn obstacles 💀
"""
def spawn_obstacles():
    new_obstacle = True
    obstacle_no = random.randint(0, NUM_OBSTACLES_PER_QUEUE - 1)
    new_rect = pygame.Rect(random.randrange(0, SCREEN_WIDTH), 0, obstacles_size[0], obstacles_size[1])
    obstacle_queue.append(new_rect)
    if len(obstacle_queue) == NUM_OBSTACLES_PER_QUEUE:
        obstacle_queue.pop(0)