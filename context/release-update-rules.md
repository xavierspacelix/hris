# Mobile Release & Update Rules (Expo)

Adapted from the Serumah (`D:\sm`) release model for the HRIS Expo Employee Self-Service app. Read before touching update features, release workflow, signing, or `.env`/`app.config.js`.

> Status: not yet implemented. First release tagged `v1.0.0`.

---

## Model Distribusi

- HRIS mobile is an **Expo** app. Primary distribution is the **app stores** (Google Play / Apple) plus **EAS Update** for over-the-air (OTA) JS updates.
- For non-store / internal distribution (optional), follow the Serumah pattern: host a `version.json` manifest and let the app self-check at launch.
- Manifest URL is read from env `EXPO_PUBLIC_UPDATE_MANIFEST_URL` — **never hardcode** in code.
- Update feature must be **backend-agnostic** (URL + HTTP GET only).

---

## Kebijakan Update

- **Skip di debug**: update check only runs in release builds (`__DEV__` → return). Debug never checks.
- **Kapan cek**: on app open, non-blocking, once per session after first frame; re-check on foreground.
- **Hasil cek**:
  - Up to date (`installed.versionCode >= manifest.versionCode`) → silent.
  - Optional update (`manifest.versionCode > installed.versionCode` AND `manifest.minVersionCode <= installed.versionCode`) → dismissible dialog ("Nanti saja").
  - Forced update (`manifest.minVersionCode > installed.versionCode`) → force dialog, only "Update" button, non-dismissible.
- Install via EAS Update (reload) for OTA, or open store/APK URL for binary updates. Friendly Indonesian messages on failure.

---

## Skema `version.json`

```json
{
  "versionCode": 2,
  "versionName": "1.0.1",
  "minVersionCode": 1,
  "apkUrl": "https://github.com/<org>/hris/releases/download/v1.0.1/hris-app.apk",
  "notes": "Perbaikan bug + fitur baru."
}
```

| Field | Arti |
|---|---|
| `versionCode` | Build number (`android.versionCode` / `ios.buildNumber`) |
| `versionName` | Display version (`app.json` `version`) |
| `minVersionCode` | Lowest supported build; below = force update |
| `apkUrl` | Binary update URL (store or release asset) |
| `notes` | Release notes (from commit log) |

`versionCode`/`versionName` in `version.json` MUST match the released `app.json`.

---

## Alur Rilis

1. Bump `version` and/or `android.versionCode`+`ios.buildNumber` in `app.json`.
2. Commit + push to `main`.
3. Tag: `git tag v{versionName}`.
4. Push tag: `git push origin main --tags`.
5. EAS / GitHub Actions builds binary, generates `version.json`, publishes release.

Rule: **never build a release binary manually for distribution** — always via tag → EAS/CI.

---

## Aturan Signing & Sekuriti

- Release signed with EAS production credentials / keystore, **not** the Expo dev key.
- `*.jks`, `*.keystore`, `android/key.properties`, `ios/*.p8`, `google-services.json` **wajib di-`.gitignore`** — never committed.
- Credentials live in EAS / GitHub Secrets, never in the repo or client bundle.
- `EXPO_PUBLIC_UPDATE_MANIFEST_URL` and `EXPO_PUBLIC_API_URL` come from `app.config.js` env injection at build, not literals.

---

## Konfigurasi

- `app.config.js` / `.env`: `EXPO_PUBLIC_UPDATE_MANIFEST_URL`, `EXPO_PUBLIC_API_URL`.
- `.gitignore`: add `android/key.properties`, `*.jks`, `*.keystore`, `ios/*.p8`, `google-services.json`, `.expo/`, `dist/`.
