import sys
import math

def calculate_distance_to_line(point, line_equation):
    x0, y0 = point
    m, b = line_equation
    if m is None:
        return abs(x0 - b) 
    return abs(m * x0 - y0 + b) / ((m ** 2 + 1) ** 0.5)

point = (2, 2)
line_equation = (1, 0)
print('point : ', point)
print('line_equation : ', line_equation)
dist = calculate_distance_to_line(point, line_equation)
print(dist)