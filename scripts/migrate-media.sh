#!/bin/bash
# Zevar Baksa - Supabase to /public/ Media Migration
# Run: bash scripts/migrate-media.sh

BASE_URL="https://nwjynhhvswvyafawkhst.supabase.co/storage/v1/object/public/media"
PUBLIC_DIR="/Users/dharanshsingh/zevar baksa/public"

OK=0
FAIL=0
SKIP=0

download() {
  local remote_path="$1"
  local local_path="$PUBLIC_DIR/media/$remote_path"

  if [ -f "$local_path" ]; then
    echo "  SKIP  $remote_path"
    SKIP=$((SKIP+1))
    return
  fi

  mkdir -p "$(dirname "$local_path")"
  HTTP=$(curl -s -o "$local_path" -w "%{http_code}" "$BASE_URL/$remote_path")

  if [ "$HTTP" = "200" ]; then
    echo "  OK    $remote_path"
    OK=$((OK+1))
  else
    echo "  FAIL  $remote_path  (HTTP $HTTP)"
    rm -f "$local_path"
    FAIL=$((FAIL+1))
  fi
}

echo ""
echo "Starting Zevar Baksa media migration..."
echo "Destination: $PUBLIC_DIR/media/"
echo ""

# Logos
download "logos/primary-logo.png"
download "logos/secondary-logo-hindi.png"
download "logos/submark.png"

# Editorial / About
download "images/about-editorial.jpg"
download "images/editorial-1.jpg"

# Real Shots
download "images/real-shot-1.jpg"
download "images/real-shot-2.jpg"
download "images/real-shot-3.jpg"
download "images/real-shot-4.jpg"
download "images/real-shot-5.jpg"
download "images/real-shot-6.jpg"
download "images/real-shot-7.jpg"
download "images/real-shot-8.jpg"

# Shoot Photos
download "images/shoots/DSC07714.JPG"
download "images/shoots/DSC07736.JPG"
download "images/shoots/DSC07753.JPG"
download "images/shoots/DSC07812.JPG"
download "images/shoots/DSC07817.JPG"
download "images/shoots/DSC07871.JPG"

# Embroideries e1-e11
download "images/products/e1-1.jpg"
download "images/products/e1-2.jpg"
download "images/products/e2-1.jpg"
download "images/products/e2-2.jpg"
download "images/products/e2-3.jpg"
download "images/products/e2-4.jpg"
download "images/products/e3-1.jpg"
download "images/products/e3-2.jpg"
download "images/products/e4-1.jpg"
download "images/products/e4-2.jpg"
download "images/products/e5-1.jpg"
download "images/products/e5-2.jpg"
download "images/products/e5-3.jpg"
download "images/products/e6-1.jpg"
download "images/products/e6-2.jpg"
download "images/products/e7-1.jpg"
download "images/products/e7-2.jpg"
download "images/products/e8-1.jpg"
download "images/products/e8-2.jpg"
download "images/products/e8-3.jpg"
download "images/products/e9-1.jpg"
download "images/products/e9-2.jpg"
download "images/products/e10-1.jpg"
download "images/products/e10-2.jpg"
download "images/products/e11-1.jpg"
download "images/products/e11-2.jpg"

# Phulkaris p1-p9
download "images/products/p1-1.jpg"
download "images/products/p1-2.jpg"
download "images/products/p1-3.jpg"
download "images/products/p1-4.jpg"
download "images/products/p2-1.jpg"
download "images/products/p2-2.jpg"
download "images/products/p2-3.jpg"
download "images/products/p2-4.jpg"
download "images/products/p2-5.jpg"
download "images/products/p3-1.jpg"
download "images/products/p3-2.jpg"
download "images/products/p3-3.jpg"
download "images/products/p3-4.jpg"
download "images/products/p4-1.jpg"
download "images/products/p4-2.jpg"
download "images/products/p4-3.jpg"
download "images/products/p4-5.jpg"
download "images/products/p4-6.jpg"
download "images/products/p4-7.jpg"
download "images/products/p5-1.jpg"
download "images/products/p5-2.jpg"
download "images/products/p5-3.jpg"
download "images/products/p5-4.jpg"
download "images/products/p6-1.jpg"
download "images/products/p6-2.jpg"
download "images/products/p6-3.jpg"
download "images/products/p7-1.jpg"
download "images/products/p7-2.jpg"
download "images/products/p7-3.jpg"
download "images/products/p8-1.jpg"
download "images/products/p8-2.jpg"
download "images/products/p8-3.jpg"
download "images/products/p8-4.jpg"
download "images/products/p9-1.jpg"
download "images/products/p9-2.jpg"
download "images/products/p9-3.jpg"

echo ""
echo "Migration complete"
echo "Downloaded: $OK  |  Skipped: $SKIP  |  Failed: $FAIL"

if [ "$FAIL" -gt 0 ]; then
  echo "WARN: $FAIL files failed - Supabase may still be rate-limited. Re-run later."
  exit 1
fi

echo "All files saved to public/media/"
