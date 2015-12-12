require "html/proofer"

task :default => [:build]

task :clean do
	sh 'rm -rf ./_site'
end

task :build do
	system("jekyll build")
end

task :rebuild => [:clean, :build] do

end

task :test do
	HTML::Proofer.new("./_site", {
		href_ignore: [
			"#"
		],
		disable_external: true
	}).run
end

task :cibuild => [:rebuild, :test] do
	
end

task :deploy => :build do

end