#!/bin/bash

# Function to run tests and capture results
run_test() {
    local start_time=$(date +%s%3N)
    local test_name=$1
    echo "Running $test_name..."
    
    # Run the test and capture the exit status
    node "$test_name"
    local exit_status=$?

    local end_time=$(date +%s%3N) 
    local elapsed_time=$((end_time - start_time))
    
    # Capture result information
    if [ $exit_status -eq 0 ]; then
        result="PASS"
    else
        result="FAIL"
    fi

    results+=("$test_name | $result | ${elapsed_time} ms")
    echo "$test_name finished in ${elapsed_time} ms"
    echo "========================================="
}

# Array to store results
results=()

# Run the test files for static methods
run_test "test_from.js"
run_test "test_isArray.js"
run_test "test_of.js"


# Print the results in a stylish table format
echo "========================================="
echo "    Test Results For Static Methods      "
echo "========================================="
printf "%-20s | %-5s | %-10s\n" "Test Name" "Result" "Time Taken"
echo "-----------------------------------------"

# Loop through the results array and print each result
for result in "${results[@]}"; do
    IFS=' | ' read -r name status time <<< "$result"
    printf "%-20s | %-5s | %-10s\n" "$name" "$status" "$time"
done

echo "========================================="
echo "All tests completed! ➡️"
                