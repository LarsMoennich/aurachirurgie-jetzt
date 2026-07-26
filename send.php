<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /');
    exit;
}

if (!empty($_POST['website'] ?? '')) {
    http_response_code(204);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$phone = trim((string) ($_POST['phone'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === false || $message === '') {
    header('Location: /?status=error#kontakt');
    exit;
}

$clean = static fn(string $value): string => str_replace(["\r", "\n"], ' ', $value);
$subject = 'Neue Anfrage über aurachirurgie.jetzt';
$body = "Name: {$name}\nE-Mail: {$email}\nTelefon: {$phone}\n\nNachricht:\n{$message}\n";
$headers = [
    'From: Website aurachirurgie.jetzt <noreply@aurachirurgie.jetzt>',
    'Reply-To: ' . $clean((string) $email),
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail('lars@aurachirurgie.jetzt', $subject, $body, implode("\r\n", $headers));
header('Location: /?status=' . ($sent ? 'success' : 'error') . '#kontakt');
exit;
