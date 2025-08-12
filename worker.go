// worker.go
package main

import (
    "bufio"
    "fmt"
    "os"
    "time"
)

func main() {
    fmt.Println("Go worker ready")
    for i := 0; i < 5; i++ {
        time.Sleep(1 * time.Second)
        fmt.Printf("Go says %d\n", i)
    }

    scanner := bufio.NewScanner(os.Stdin)
    for scanner.Scan() {
        msg := scanner.Text()
        fmt.Printf("Go got: %s\n", msg)
    }
}
