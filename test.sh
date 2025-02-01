
endpoint="http://localhost:3000/insert"
num=30

send() {
  curl -s -o /dev/null $endpoint
}

for ((i=1; i<=$num; i++)); do
  send &
done

wait