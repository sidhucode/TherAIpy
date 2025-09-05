from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os

class TherapyHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

    def do_POST(self):
        if self.path == '/chat':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            message = json.loads(post_data.decode('utf-8'))

            # Simple response logic
            response = {
                "type": "coach",
                "language": "en",
                "text": f"I hear you saying '{message['text']}'. Let's explore that feeling together.",
                "exercise": "Take three deep breaths and tell me more about what's on your mind."
            }

            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())
            return

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

server = HTTPServer(('localhost', 8000), TherapyHandler)
print("Server running on http://localhost:8000")
server.serve_forever()
