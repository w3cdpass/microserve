# worker.py
import sys
import time

print("Python worker ready", flush=True)

for i in range(5):
    time.sleep(1)
    print(f"Python says {i}", flush=True)

for line in sys.stdin:
    msg = line.strip()
    print(f"Python got: {msg}", flush=True)
