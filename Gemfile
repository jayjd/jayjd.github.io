source "https://rubygems.org"

gem "minima", "~> 2.5"
gem "github-pages", group: :jekyll_plugins
gem "jekyll-sitemap"
gem "webrick", "~> 1.7"
gem "ffi", "~> 1.15.5"  # 降级 ffi 版本

group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]