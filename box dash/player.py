import pygame


player = pygame.Rect(300,250,50,50)

"""
move the player when movement keys are pressed (arrow keys as at now)
"""
def move_player(key):
    if key[pygame.K_LEFT] == True:
        player.move_ip(-1, 0)
    elif key[pygame.K_RIGHT] == True:
        player.move_ip(1, 0)
    elif key[pygame.K_DOWN] == True:
        player.move_ip(0, 1) #because higher x is further DOWN the screen
    elif key[pygame.K_UP] == True:
        player.move_ip(0, -1)

