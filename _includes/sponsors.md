{%- assign currentSponsors = sponsors[active_year] -%}
{%- assign numberSponsors = currentSponsors | size -%}
{%- if numberSponsors > 0 -%}
  <div class="row">
    <div class="section-title text-center">
        <h3>Sponsors</h3>
    </div> 
  </div>
  <div class="row sponsors">
    {%- assign sponsor_level = "" -%}
    {%- for sponsor in currentSponsors -%}
    
      {%- if sponsor_level != sponsor.Level -%}
        {%- assign sponsor_level = sponsor.Level -%}
        <div class="sponsor-class text-center">
          <h4>{{ sponsor_level }}</h4>
        </div>
      {%- endif -%}      

      <div class="sponsor sponsor-{{ sponsor.Level | downcase }}"><a href="{{ sponsor.Link }}" target="_blank"><img src="/{{ active_year }}/sponsors/{{ sponsor.Image }}" alt="{{ sponsor.Name }}" /></a></div>
    {%- endfor -%}
  </div>
{%- endif -%}